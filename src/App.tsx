import { useState } from "react";

type TPoint = {
  x: number;
  y: number;
};
const App = () => {
  const [point, setPoint] = useState<TPoint[]>([]);
  const [popped, setPopped] = useState<TPoint[]>([]);

  const handleClickEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    setPoint([...point, { x: clientX, y: clientY }]);
  };

  const handleUndo = () => {
    const newPoint = [...point];
    const poppedPoint = newPoint.pop();
    if (!poppedPoint) return;
    setPopped([...popped, poppedPoint]);
    setPoint(newPoint);
  };

  const handleRedo = () => {
    const newPopped = [...popped];
    const poppedPoint = newPopped.pop();
    if (!poppedPoint) return;
    setPoint([...point, poppedPoint]);
    setPopped(newPopped);
  };
  return (
    <div className="bg-black ">
      <button
        disabled={point.length === 0}
        className="text-white p-2 border bg-blue-700 border-red-100 rounded-r disabled:text-slate-300 disabled:border-none disabled:bg-black"
        onClick={handleUndo}
      >
        Undo
      </button>
      <button
        disabled={popped.length === 0}
        className="text-white p-2 border bg-blue-700 border-red-100 rounded-r disabled:text-slate-300 disabled:border-none disabled:bg-black"
        onClick={handleRedo}
      >
        Redo
      </button>
      <div className="h-screen" onClick={handleClickEvent}>
        {point.map((point, i) => (
          <div
            key={i}
            className="text-white absolute inline-block h-4 w-4 bg-blue-600 border border-blue-400 rounded-full"
            style={{ left: point.x - 5, top: point.y - 10 }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default App;
