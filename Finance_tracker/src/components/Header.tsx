import LanguageSelector from "./LanguageSelector";

const Header = () => {
  return (
    <header className="sticky top-0 z-1 border-b-1 border-gray-100 shadow-md min-h-[70px]">
      <div className="wrapper relative z-1 flex items-center justify-between px-4 py-1 max-w-[1440px] mx-auto">
        <div className="icon flex items-baseline">
          <img src="/logo.svg" alt="" className="w-20" />
        </div>
        <LanguageSelector />
      </div>
    </header>
  );
};

export default Header;
