import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { uploadPDFAndLogDownload } from './supabaseData';

/**
 * Ultra-Reliable High-Resolution PDF Generator for ResumeFlow
 * Saves to user's device and uploads PDF & form data to Supabase Storage & Database
 */
export const exportResumeToPDF = async (
  elementId,
  filename = 'Resume.pdf',
  paperSize = 'a4',
  resume = null,
  user = null
) => {
  const sourceElement = document.getElementById(elementId);
  if (!sourceElement) {
    throw new Error(`Resume element with ID "${elementId}" not found`);
  }

  // Ensure fonts are fully loaded
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // safe fallback
    }
  }

  // 1. Create a clean, isolated off-screen clone container to avoid any zoom / transform clipping
  const cloneContainer = document.createElement('div');
  cloneContainer.style.position = 'fixed';
  cloneContainer.style.top = '-10000px';
  cloneContainer.style.left = '-10000px';
  cloneContainer.style.zIndex = '-9999';
  cloneContainer.style.opacity = '1';
  cloneContainer.style.pointerEvents = 'none';

  // Clone the resume node
  const clonedResume = sourceElement.cloneNode(true);
  clonedResume.id = 'resume-export-clone';
  clonedResume.style.transform = 'none';
  clonedResume.style.boxShadow = 'none';
  clonedResume.style.margin = '0';

  // Fix image CORS on cloned node if any
  const images = clonedResume.querySelectorAll('img');
  images.forEach(img => {
    img.crossOrigin = 'anonymous';
  });

  cloneContainer.appendChild(clonedResume);
  document.body.appendChild(cloneContainer);

  try {
    const isA4 = (paperSize || 'a4').toLowerCase() === 'a4';
    const pdfWidth = isA4 ? 210 : 215.9; // mm
    const pdfHeight = isA4 ? 297 : 279.4; // mm

    // Render high-DPI canvas
    const canvas = await html2canvas(clonedResume, {
      scale: 2.2, // Crisp 300+ DPI equivalent
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: clonedResume.offsetWidth || 800,
      windowHeight: clonedResume.offsetHeight || 1130,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: isA4 ? 'a4' : 'letter',
      compress: true,
    });

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Subsequent pages if content overflows standard page height
    while (heightLeft > 5) {
      position -= pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    const cleanFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    
    // Save to user machine
    pdf.save(cleanFilename);

    // Concurrently upload PDF blob and log form data snapshot to Supabase
    if (resume) {
      try {
        const pdfBlob = pdf.output('blob');
        uploadPDFAndLogDownload(pdfBlob, cleanFilename, resume, user).catch(uploadErr => {
          console.warn('Asynchronous Supabase upload background error:', uploadErr);
        });
      } catch (blobErr) {
        console.warn('PDF blob generation for Supabase upload error:', blobErr);
      }
    }

    return true;
  } catch (err) {
    console.error('Direct canvas PDF export failed, triggering fallback:', err);
    // Fallback: Use browser print engine
    printResume();
    return true;
  } finally {
    // Always clean up the temporary clone container
    if (cloneContainer && cloneContainer.parentNode) {
      cloneContainer.parentNode.removeChild(cloneContainer);
    }
  }
};

/**
 * Dedicated Browser Print Trigger
 */
export const printResume = () => {
  window.print();
};

/**
 * Exports resume data as a JSON backup file
 */
export const exportResumeToJSON = (resume) => {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  const safeName = (resume.title || 'resume').toLowerCase().replace(/[^a-z0-9]/g, '-');
  downloadAnchor.setAttribute('download', `${safeName}-backup.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

/**
 * Exports resume as clean ATS Plain Text
 */
export const generatePlainTextResume = (resume) => {
  const lines = [];
  const p = resume.personalInfo || {};

  if (p.fullName) lines.push(p.fullName.toUpperCase());
  if (p.professionalTitle) lines.push(p.professionalTitle);
  
  const contacts = [p.email, p.phone, p.location, p.linkedin, p.github, p.website].filter(Boolean);
  if (contacts.length) lines.push(contacts.join(' | '));
  lines.push('');

  if (resume.summary) {
    lines.push('--- PROFESSIONAL SUMMARY ---');
    lines.push(resume.summary);
    lines.push('');
  }

  if (resume.experience && resume.experience.length) {
    lines.push('--- WORK EXPERIENCE ---');
    resume.experience.forEach(exp => {
      lines.push(`${exp.jobTitle} | ${exp.company} (${exp.startDate || ''} - ${exp.currentlyWorking ? 'Present' : exp.endDate || ''})`);
      if (exp.location) lines.push(`Location: ${exp.location}`);
      (exp.bullets || []).forEach(b => {
        if (b?.trim()) lines.push(`• ${b}`);
      });
      lines.push('');
    });
  }

  if (resume.skills && resume.skills.length) {
    lines.push('--- SKILLS ---');
    lines.push(resume.skills.map(s => s.name).join(', '));
    lines.push('');
  }

  if (resume.education && resume.education.length) {
    lines.push('--- EDUCATION ---');
    resume.education.forEach(edu => {
      lines.push(`${edu.degree} - ${edu.institution}`);
      if (edu.fieldOfStudy) lines.push(`Field: ${edu.fieldOfStudy}`);
      if (edu.gpa) lines.push(`GPA: ${edu.gpa}`);
      if (edu.graduationDate) lines.push(`Graduation: ${edu.graduationDate}`);
      lines.push('');
    });
  }

  if (resume.projects && resume.projects.length) {
    lines.push('--- KEY PROJECTS ---');
    resume.projects.forEach(proj => {
      lines.push(`${proj.name} ${proj.projectUrl ? `(${proj.projectUrl})` : ''}`);
      if (proj.description) lines.push(proj.description);
      if (proj.technologies && proj.technologies.length) lines.push(`Tech Stack: ${proj.technologies.join(', ')}`);
      lines.push('');
    });
  }

  return lines.join('\n');
};
