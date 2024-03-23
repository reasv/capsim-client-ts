import React from 'react';
import { FaFire } from 'react-icons/fa';
interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {

    return (
        <div className="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-900 shadow-lg">
            <SidebarIcon icon={<FaFire size="28"></FaFire>} />
            <SidebarIcon icon={<FaFire size="28"></FaFire>} />
            <SidebarIcon icon={<FaFire size="28"></FaFire>} />
        </div>
    );
};


const SidebarIcon = ({icon}: {icon: JSX.Element}) => {
    return (
      <div className="
            relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-auto shadow-lg
            bg-gray-800 text-green-500 hover:bg-green-500 hover:text-white
            rounded-3xl hover:rounded-xl transition-all
         ">
        {icon}
      </div>
    )
}
export default Sidebar;