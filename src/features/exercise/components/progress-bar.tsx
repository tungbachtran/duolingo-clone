// components/exercises/ProgressBar.tsx
interface ProgressBarProps {
    progress: number;
  }
  
  const ProgressBar = ({ progress }: ProgressBarProps) => {
    return (
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };
  
  export default ProgressBar;
  