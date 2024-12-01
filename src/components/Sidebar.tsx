import { CircleIcon, RefreshCcw, SquareIcon, TypeOutline } from "lucide-react";

type Shape = 'circle' | 'square' | 'text';

interface SidebarProps {
  selectedShape: Shape;
  setSelectedShape: (shape: Shape) => void;
  onClear: () => void;
}

export default function Sidebar({ selectedShape, setSelectedShape, onClear }: SidebarProps) {
  return (
    <div className="w-20 bg-gray-100 p-4 border-r">
      <h2 className="text-xl font-bold mb-4">Tools</h2>
      <div className="space-y-2">
        <button
          className={`w-full p-2 rounded center-content ${
            selectedShape === 'circle'
              ? 'bg-blue-500 text-white'
              : 'bg-white hover:bg-gray-200'
          }`}
          onClick={() => setSelectedShape('circle')}
        >
          <CircleIcon className="h-6 w-6" />
        </button>
        <button
          className={`w-full p-2 rounded center-content ${
            selectedShape === 'square'
              ? 'bg-blue-500 text-white'
              : 'bg-white hover:bg-gray-200'
          }`}
          onClick={() => setSelectedShape('square')}
        >
          <SquareIcon className="h-6 w-6" />
        </button>
        <button
          className={`w-full p-2 rounded center-content ${
            selectedShape === 'text'
              ? 'bg-blue-500 text-white'
              : 'bg-white hover:bg-gray-200'
          }`}
          onClick={() => setSelectedShape('text')}
        >
          <TypeOutline className="h-6 w-6" />
        </button>

        <div className="border-t border-gray-300 my-4"></div>

        <button
          className="w-full p-2 rounded bg-red-500 text-white hover:bg-red-600 center-content"
          onClick={onClear}
        >
          <RefreshCcw className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
