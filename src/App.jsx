import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/Toast';
import { AuthModal } from './components/auth/AuthModal';
import { Dashboard } from './components/dashboard/Dashboard';
import { MyResumes } from './components/resumes/MyResumes';
import { TemplateGallery } from './components/templates/TemplateGallery';
import { ResumeBuilder } from './components/builder/ResumeBuilder';
import { CreateResumeModal } from './components/dashboard/CreateResumeModal';
import { ATSCheckerModal } from './components/ai/ATSCheckerModal';
import { JobMatcherModal } from './components/ai/JobMatcherModal';
import { SettingsModal } from './components/ai/SettingsModal';

function AppContent() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'builder' | 'my-resumes' | 'templates'
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isATSModalOpen, setIsATSModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const { setActiveResumeId } = useResume();

  const handleEditResume = (id) => {
    if (id) setActiveResumeId(id);
    setCurrentView('builder');
  };

  const handleResumeCreated = (newId) => {
    setActiveResumeId(newId);
    setCurrentView('builder');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'builder':
        return <ResumeBuilder />;
      case 'my-resumes':
        return (
          <MyResumes
            onEditResume={() => setCurrentView('builder')}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
          />
        );
      case 'templates':
        return (
          <TemplateGallery
            onOpenBuilder={() => setCurrentView('builder')}
          />
        );
      case 'dashboard':
      default:
        return (
          <Dashboard
            onEditResume={() => setCurrentView('builder')}
            onOpenCreateModal={() => setIsCreateModalOpen(true)}
            onSelectTemplateView={() => setCurrentView('templates')}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {/* Top Fixed Navbar */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          onOpenCreateModal={() => setIsCreateModalOpen(true)}
          onOpenATSModal={() => setIsATSModalOpen(true)}
          onOpenJobModal={() => setIsJobModalOpen(true)}
          onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        />

        {/* Main Work Area (Sidebar + View) */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            isCollapsed={isSidebarCollapsed}
            setIsCollapsed={setIsSidebarCollapsed}
            onOpenJobModal={() => setIsJobModalOpen(true)}
          />

          <main className="main-content">
            {renderCurrentView()}
          </main>
        </div>
      </div>

      {/* Global Modals & Notifications */}
      <AuthModal />
      
      <CreateResumeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreated={handleResumeCreated}
      />

      <ATSCheckerModal
        isOpen={isATSModalOpen}
        onClose={() => setIsATSModalOpen(false)}
      />

      <JobMatcherModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <AppContent />
      </ResumeProvider>
    </AuthProvider>
  );
}
