import Button from '@/components/AskButton';
import NavBar from '@/components/NavBar';
import Query from '@/components/Query';
import Response from '@/components/Response';
import SideBar from '@/components/SideBar';
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
          <div className='mr-10'>
            <SideBar />
          </div>
          <div className='flex-grow max-w-screen-lg'>
            <div>
              <Query />
            </div>
            <div className='mt-2'>
              <Button />
            </div>
            <div className='mt-2'>
              <Response />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
