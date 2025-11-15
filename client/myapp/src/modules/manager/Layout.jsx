import Sidebar from './Sidebar'
import '../../styles/modules/manager.css'
import {Toaster} from 'sonner';
import {BiReceipt} from 'react-icons/bi';

export default function ManagerLayout({ children }) {
  return (
    <div className="mgr__layout">
      <Sidebar />
      <main className="mgr__content">
          <Toaster icons={{
          duration:4000,
          info: <BiReceipt size={30} color='#2196f3'/>,
        }}/>
        {children}
      </main>
    </div>
  )
}
