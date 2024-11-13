import './App.css';
import ToastManager from './Components/ToastManager';

function App() {
  // some optional theme
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const theme = 'dark:text-white dark:bg-gray-900'
  return (
    <div className="App ">
      <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>
        Toasts
      </h1>
      <h2>Click on the Show Toasts button to show toasts</h2>
      <div className="h-[calc(100vh-6.5rem)] w-screen flex justify-center items-center">
        <ToastManager />
      </div>
    </div>
  );
}

export default App;
