import React, { ReactNode } from 'react';
import { DesktopInfoPanel } from './DesktopInfoPanel';

interface PhoneWrapperProps {
  children: ReactNode;
}

export const PhoneWrapper: React.FC<PhoneWrapperProps> = ({ children }) => {
  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-800 overflow-hidden">
      <div className="mx-auto max-w-7xl lg:p-8 h-full">
        <div className="lg:flex lg:gap-8 lg:justify-center h-full">
          {/* Phone Mockup */}
          <div className="lg:flex-shrink-0 h-full">
            <div className="mx-auto lg:mx-0 w-full lg:w-[375px] h-full">
              {/* Phone Frame - Desktop Only */}
              <div className="bg-gray-900 rounded-3xl p-2 shadow-2xl lg:block hidden h-full max-h-[800px]">
                <div className="bg-black rounded-2xl p-1 h-full">
                  <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden h-full relative">
                    <div className="w-full h-full relative">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile - Full Screen */}
              <div className="lg:hidden w-full h-full relative">
                {children}
              </div>
            </div>
          </div>

          {/* Desktop Info Panel */}
          <DesktopInfoPanel />
        </div>
      </div>
    </div>
  );
};