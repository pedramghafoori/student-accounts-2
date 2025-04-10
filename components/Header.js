const Header = ({ headerTitle, currentAccountName, accounts, onSelectAccount }) => {
const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  function handleLogout() {
    document.cookie = "userToken=; path=/; max-age=0;";
    window.location.href = "/login";
  }

  return (
    <header className="relative bg-blue-500 text-white overflow-hidden">
      {/* Curved SVG background */}
      <div className="absolute inset-0">
        <svg 
          className="w-full h-full text-blue-500" 
          preserveAspectRatio="none" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320"
        >
          <path 
            fill="currentColor" 
            fillOpacity="1" 
            d="M0,192L60,165.3C120,139,240,85,360,69.3C480,53,600,75,720,96C840,117,960,139,1080,122.7C1200,107,1320,53,1380,26.7L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Header content */}
      <div className="relative p-6 pt-10 md:pt-14">
        <h1 className="text-2xl md:text-3xl font-bold">{headerTitle}</h1>
        <p className="mt-2 text-lg md:text-xl font-semibold">{currentAccountName}</p>

        {/* Switch Accounts button moved to right side */}
        {accounts && accounts.length > 1 && (
          <div className="absolute top-6 right-6 flex flex-col items-end">
            <button
              onClick={() => setShowAccountDropdown(!showAccountDropdown)}
              className="flex items-center space-x-2 text-blue-100 hover:text-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A9 9 0 1119 8.999m-2.1 5.1A5 5 0 1012 7.999"
                />
              </svg>
              <span>Switch Accounts</span>
            </button>
            {showAccountDropdown && (
              <div className="mt-2 p-4 border rounded bg-white text-black w-48">
                <h2 className="text-xl font-bold mb-2 text-center">Accounts</h2>
                <div className="overflow-y-auto max-h-64">
                  {accounts.map((acc) => (
                    <div
                      key={acc.Id}
                      onClick={() => {
                        if (onSelectAccount) onSelectAccount(acc.Id);
                        setShowAccountDropdown(false);
                      }}
                      className="border rounded-lg p-2 mb-2 cursor-pointer hover:bg-blue-50"
                    >
                      <h2 className="text-lg">{acc.Name}</h2>
                    </div>
                  ))}
                </div>
                <div className="mt-2 border-t pt-2 text-center">
                  <button
                    onClick={handleLogout}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
