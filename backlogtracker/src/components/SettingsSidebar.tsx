type SettingsSection = 'account' | 'privacy';

interface SidebarProps {
  selected: SettingsSection;
  onSelect: (section: SettingsSection) => void;
}

export default function SettingsSidebar({ selected, onSelect }: SidebarProps) {
  return (
    <nav className="w-48 border-r border-gray-700 text-white space-y-4 p-4">
      <button
        className={`block text-left w-full px-2 py-2 rounded ${
          selected === 'account' ? 'bg-gray-800' : 'hover:bg-gray-800'
        }`}
        onClick={() => onSelect('account')}
      >
        Account
      </button>
      <button
        className={`block text-left w-full px-2 py-2 rounded ${
          selected === 'privacy' ? 'bg-gray-800' : 'hover:bg-gray-800'
        }`}
        onClick={() => onSelect('privacy')}
      >
        Notifications
      </button>
    </nav>
  );
}
