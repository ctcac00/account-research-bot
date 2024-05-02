import App from '@/components/App';
import NavBar from '@/components/NavBar';
import WarningBanner from '@/components/WarningBanner';

export default function Home() {
  return (
    <main className=''>
      <NavBar />
      <div className='max-w-screen-2xl mx-auto p-3'>
        <div className='flex justify-center mx-auto p-3'>
          <WarningBanner />
        </div>
        <div className='flex mx-auto p-3'>
          <App />
        </div>
      </div>
    </main>
  );
}
