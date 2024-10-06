import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = ({ setMode }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">Face Recognition App</div>
      <div className="flex gap-4">
        <Button onClick={() => setMode('upload')}>Upload Image</Button>
        <Button onClick={() => setMode('webcam')}>Use Webcam</Button>
        <Button onClick={() => setMode('add')}>Add New Face</Button>
      </div>
    </nav>
  );
};

export default Navbar;
