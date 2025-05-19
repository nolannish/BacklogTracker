'use client';

import { useState } from 'react';
import SettingsSidebar from './SettingsSidebar';
import AccountSettings from './AccountSettings';
import PrivacySettings from './PrivacySettings';

type Section = 'account' | 'privacy'

export default function SettingsContent() {
  const [selectedSection, setSelectedSection] = useState<Section>('account');

  return (
    <>
      <SettingsSidebar  selected={selectedSection} onSelect={setSelectedSection} />

      <div className="flex-1 p-6">
        {selectedSection === 'account' && <AccountSettings />}
        {selectedSection === 'privacy' && <PrivacySettings />}
      </div>
    </>
  )
}