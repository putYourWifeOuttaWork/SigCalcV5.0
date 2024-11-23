import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updatePosition() {
      if (!tooltipRef.current || !containerRef.current) return;
      
      const container = containerRef.current.getBoundingClientRect();
      const tooltip = tooltipRef.current;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Reset position to calculate natural dimensions
      tooltip.style.left = '0';
      tooltip.style.right = 'auto';
      tooltip.style.top = '100%';
      tooltip.style.bottom = 'auto';
      tooltip.style.transform = 'none';
      
      const tooltipRect = tooltip.getBoundingClientRect();
      
      // Check if tooltip would overflow right edge
      if (container.left + tooltipRect.width > viewportWidth) {
        const overflow = container.left + tooltipRect.width - viewportWidth;
        tooltip.style.left = `${-overflow - 10}px`; // 10px buffer
      } else {
        tooltip.style.left = '0';
      }

      // Position vertically below the element
      tooltip.style.top = '100%';
      tooltip.style.marginTop = '8px';

      // Check if tooltip would overflow bottom edge
      if (container.bottom + tooltipRect.height > viewportHeight) {
        // Position above if there's more space there
        if (container.top > (viewportHeight - container.bottom)) {
          tooltip.style.top = 'auto';
          tooltip.style.bottom = '100%';
          tooltip.style.marginTop = '0';
          tooltip.style.marginBottom = '8px';
        }
      }
    }

    if (isVisible) {
      requestAnimationFrame(updatePosition);
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="flex items-center gap-1">
        {children}
        <span className="text-gray-400 hover:text-gray-600 cursor-help">ⓘ</span>
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-50 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg min-w-[300px] max-w-[400px] leading-relaxed"
          style={{ width: '300px' }}
        >
          {content}
        </div>
      )}
    </div>
  );
}