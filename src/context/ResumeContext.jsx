import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { SAMPLE_RESUMES } from '../data/sampleResumes';
import { createEmptyResume } from '../data/initialResume';
import { calculateATSScore } from '../utils/atsScore';
import { saveResumeToSupabase } from '../utils/supabaseData';

const ResumeContext = createContext(null);

const STORAGE_KEY = 'resumeflow_resumes';
const ACTIVE_ID_KEY = 'resumeflow_active_id';

export const ResumeProvider = ({ children }) => {
  // Initialize resumes from localStorage or sample resumes
  const [resumes, setResumes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading resumes from localStorage:', e);
    }
    return SAMPLE_RESUMES;
  });

  const [activeResumeId, setActiveResumeId] = useState(() => {
    const savedId = localStorage.getItem(ACTIVE_ID_KEY);
    if (savedId && resumes.some(r => r.id === savedId)) {
      return savedId;
    }
    return resumes[0]?.id || '';
  });

  // Autosave status state
  const [autosaveStatus, setAutosaveStatus] = useState('saved'); // 'saving' | 'saved'
  const [lastSavedTime, setLastSavedTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  // Toast Notification State
  const [toast, setToast] = useState(null);
  const toastTimeoutRef = useRef(null);

  const showToast = useCallback((message, type = 'success') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ id: Date.now(), message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  // Save to localStorage when resumes change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
    } catch (e) {
      console.error('Failed to persist resumes to storage:', e);
    }
  }, [resumes]);

  // Persist activeResumeId
  useEffect(() => {
    if (activeResumeId) {
      localStorage.setItem(ACTIVE_ID_KEY, activeResumeId);
    }
  }, [activeResumeId]);

  // Active Resume Object
  const activeResume = resumes.find(r => r.id === activeResumeId) || resumes[0] || null;

  // Debounced Autosave Updater
  const saveTimeoutRef = useRef(null);

  const updateActiveResume = useCallback((updater) => {
    setAutosaveStatus('saving');

    let updatedActiveResume = null;

    setResumes(prevResumes => {
      return prevResumes.map(r => {
        if (r.id !== activeResumeId) return r;

        const updated = typeof updater === 'function' ? updater(r) : { ...r, ...updater };
        const ats = calculateATSScore(updated);
        
        updatedActiveResume = {
          ...updated,
          metadata: {
            ...updated.metadata,
            updatedAt: new Date().toISOString(),
            completionScore: ats.overallScore,
          }
        };
        return updatedActiveResume;
      });
    });

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      setAutosaveStatus('saved');
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

      // Automatically sync updated form data to Supabase
      if (updatedActiveResume) {
        saveResumeToSupabase(updatedActiveResume).catch(err => {
          console.warn('Background Supabase autosave notice:', err);
        });
      }
    }, 600);
  }, [activeResumeId]);

  // Create Resume
  const createResume = useCallback(({ title = 'Untitled Resume', targetRole = '', templateId = 'modern', source = 'scratch', sampleId = '' }) => {
    let newResume;

    if (source === 'sample' && sampleId) {
      const sample = SAMPLE_RESUMES.find(s => s.id === sampleId) || SAMPLE_RESUMES[0];
      newResume = {
        ...JSON.parse(JSON.stringify(sample)),
        id: `resume-${Date.now()}`,
        title: title || sample.title,
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: 1,
          downloadCount: 0,
          completionScore: sample.metadata?.completionScore || 90,
        }
      };
    } else {
      newResume = createEmptyResume(title, targetRole);
      if (templateId) newResume.templateId = templateId;
    }

    setResumes(prev => [newResume, ...prev]);
    setActiveResumeId(newResume.id);
    showToast(`Resume "${newResume.title}" created successfully!`, 'success');
    return newResume;
  }, [showToast]);

  // Duplicate Resume
  const duplicateResume = useCallback((id) => {
    const target = resumes.find(r => r.id === id);
    if (!target) return;

    const duplicated = {
      ...JSON.parse(JSON.stringify(target)),
      id: `resume-${Date.now()}`,
      title: `${target.title} (Copy)`,
      metadata: {
        ...target.metadata,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
        downloadCount: 0,
      }
    };

    setResumes(prev => [duplicated, ...prev]);
    setActiveResumeId(duplicated.id);
    showToast(`Duplicated "${target.title}" successfully!`, 'success');
    return duplicated;
  }, [resumes, showToast]);

  // Rename Resume
  const renameResume = useCallback((id, newTitle) => {
    if (!newTitle?.trim()) return;
    setResumes(prev => prev.map(r => (r.id === id ? { ...r, title: newTitle.trim() } : r)));
    showToast('Resume renamed successfully', 'info');
  }, [showToast]);

  // Delete Resume
  const deleteResume = useCallback((id) => {
    setResumes(prev => {
      const filtered = prev.filter(r => r.id !== id);
      if (filtered.length === 0) {
        const fresh = createEmptyResume('My First Resume', '');
        setActiveResumeId(fresh.id);
        return [fresh];
      }
      if (activeResumeId === id) {
        setActiveResumeId(filtered[0].id);
      }
      return filtered;
    });
    showToast('Resume deleted', 'info');
  }, [activeResumeId, showToast]);

  // Update Resume Template
  const setResumeTemplate = useCallback((templateId) => {
    updateActiveResume(prev => ({ ...prev, templateId }));
    showToast(`Template updated to ${templateId.toUpperCase()}`, 'info');
  }, [updateActiveResume, showToast]);

  // Update Styling Settings
  const updateStyling = useCallback((styleUpdates) => {
    updateActiveResume(prev => ({
      ...prev,
      styling: {
        ...prev.styling,
        ...styleUpdates
      }
    }));
  }, [updateActiveResume]);

  // Reorder Sections
  const reorderSections = useCallback((newSections) => {
    updateActiveResume(prev => ({
      ...prev,
      sections: newSections
    }));
  }, [updateActiveResume]);

  // Toggle Section Visibility
  const toggleSectionVisibility = useCallback((sectionId) => {
    updateActiveResume(prev => ({
      ...prev,
      sections: (prev.sections || []).map(sec => 
        sec.id === sectionId ? { ...sec, visible: !sec.visible } : sec
      )
    }));
  }, [updateActiveResume]);

  // Add Custom Section
  const addCustomSection = useCallback((title = 'Custom Section') => {
    const customId = `custom-sec-${Date.now()}`;
    updateActiveResume(prev => {
      const newSec = {
        id: customId,
        type: 'custom',
        title: title.trim(),
        visible: true,
      };
      const newCustomEntries = [
        ...(prev.customSections || []),
        {
          id: customId,
          title: title.trim(),
          items: [
            {
              id: `item-${Date.now()}`,
              title: 'Activity / Project / Detail',
              subtitle: 'Organization / Scope',
              date: '2024 - Present',
              description: 'Key accomplishments and relevant points.',
            }
          ]
        }
      ];
      return {
        ...prev,
        sections: [...(prev.sections || []), newSec],
        customSections: newCustomEntries,
      };
    });
    showToast(`Added section: ${title}`, 'success');
  }, [updateActiveResume, showToast]);

  // Import from JSON
  const importResumeJSON = useCallback((jsonData) => {
    try {
      const parsed = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (!parsed.personalInfo && !parsed.experience) {
        throw new Error('Invalid resume format');
      }
      const newResume = {
        ...parsed,
        id: `resume-${Date.now()}`,
        title: `${parsed.title || 'Imported Resume'} (Imported)`,
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: 1,
          downloadCount: 0,
          completionScore: calculateATSScore(parsed).overallScore,
        }
      };
      setResumes(prev => [newResume, ...prev]);
      setActiveResumeId(newResume.id);
      showToast('Resume imported successfully!', 'success');
      return true;
    } catch (e) {
      showToast('Failed to import JSON: Invalid format', 'danger');
      return false;
    }
  }, [showToast]);

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        activeResume,
        activeResumeId,
        setActiveResumeId,
        updateActiveResume,
        createResume,
        duplicateResume,
        renameResume,
        deleteResume,
        setResumeTemplate,
        updateStyling,
        reorderSections,
        toggleSectionVisibility,
        addCustomSection,
        importResumeJSON,
        autosaveStatus,
        lastSavedTime,
        toast,
        showToast,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
