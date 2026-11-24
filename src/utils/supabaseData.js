import { supabase } from './supabaseClient';
import { calculateATSScore } from './atsScore';

/**
 * Saves or updates a resume's form data in Supabase 'public.resumes'
 */
export const saveResumeToSupabase = async (resume, user = null) => {
  if (!resume) return null;

  const ats = calculateATSScore(resume);
  const score = ats.overallScore;

  const payload = {
    id: resume.id,
    user_id: user?.id || null,
    user_email: user?.email || resume.personalInfo?.email || null,
    title: resume.title || 'Untitled Resume',
    target_role: resume.targetRole || resume.personalInfo?.professionalTitle || '',
    template_id: resume.templateId || 'modern',
    styling: resume.styling || {},
    personal_info: resume.personalInfo || {},
    summary: resume.summary || '',
    experience: resume.experience || [],
    education: resume.education || [],
    skills: resume.skills || [],
    projects: resume.projects || [],
    certifications: resume.certifications || [],
    achievements: resume.achievements || [],
    languages: resume.languages || [],
    custom_sections: resume.customSections || [],
    sections: resume.sections || [],
    metadata: resume.metadata || {},
    ats_score: score,
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('resumes')
      .upsert(payload, { onConflict: 'id' })
      .select();

    if (error) {
      console.warn('Supabase resume sync note:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase resume save error:', err);
    return null;
  }
};

/**
 * Uploads a generated PDF file to Supabase Storage ('resume-pdfs' bucket)
 * and records the export with all user form details in 'public.pdf_downloads' table
 */
export const uploadPDFAndLogDownload = async (pdfBlob, filename, resume, user = null) => {
  if (!pdfBlob || !resume) return null;

  const userIdentifier = user?.id || 'guest';
  const timestamp = Date.now();
  const cleanFileName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
  const storagePath = `exports/${userIdentifier}/${timestamp}_${cleanFileName}`;

  let publicUrl = '';

  try {
    // 1. Upload PDF Blob to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('resume-pdfs')
      .upload(storagePath, pdfBlob, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (!uploadError && uploadData) {
      const { data: urlData } = supabase.storage
        .from('resume-pdfs')
        .getPublicUrl(storagePath);
      publicUrl = urlData?.publicUrl || '';
    } else if (uploadError) {
      console.warn('Supabase storage upload note:', uploadError.message);
    }
  } catch (storageErr) {
    console.warn('Supabase storage upload error:', storageErr);
  }

  // 2. Insert record into 'public.pdf_downloads' table with full user form data
  try {
    const ats = calculateATSScore(resume);
    const downloadRecord = {
      user_id: user?.id || null,
      user_email: user?.email || resume.personalInfo?.email || 'guest@resumeflow.io',
      resume_id: resume.id,
      resume_title: resume.title || 'Resume',
      filename: cleanFileName,
      pdf_url: publicUrl,
      ats_score: ats.overallScore,
      form_data: resume, // Complete user form data snapshot
      downloaded_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('pdf_downloads')
      .insert([downloadRecord])
      .select();

    if (error) {
      console.warn('Supabase download logging note:', error.message);
    } else {
      console.log('Successfully recorded PDF download in Supabase:', data);
    }

    return { publicUrl, record: data?.[0] };
  } catch (dbErr) {
    console.warn('Supabase pdf_downloads insert error:', dbErr);
    return { publicUrl, record: null };
  }
};
