import { Menu } from "lucide-react";
import MenuItems from "./menu-items";
import { useState } from "react";
import { Drawer } from "antd";

function Sidebar() {
  const [showMobileMenu, setSHowMobileMenu] = useState(false);
  return (
    <div>
      <div className="lg:flex hidden h-full lg:w-60">
        <MenuItems />
      </div>
      <div className="bg-info p-5 lg:hidden flex">
        <Menu
          size={20}
          color="white"
          onClick={() => setSHowMobileMenu(!showMobileMenu)}
          className="cursor-pointer"
        />
      </div>

      {showMobileMenu && (
        <Drawer
          open={showMobileMenu}
          placement="left"
          onClose={() => setSHowMobileMenu(false)}
        >
          <MenuItems />
        </Drawer>
      )}
    </div>
  );
}

export default Sidebar;
