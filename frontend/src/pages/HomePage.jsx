import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import RateLimitedUi from '../components/RateLimitedUi'
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound';
import { useAuth } from '@clerk/clerk-react';
import api from '../lib/axios';

const HomePage = () => {
  const { getToken } = useAuth();
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = await getToken();
        if(!token) {
          setLoading(false);
          return;
        }
        const res = await api.get("/notes", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("🔴 Fetching notes error: ", error);
        if(error.response.status === 429){
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);

  return (
    <main className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitedUi />}
      <div className='max-w-7xl mx-auto p-4 mt-6 flex items-center justify-center'>
        {loading && <span className="loading loading-infinity loading-lg"></span>}
      </div>

      {(notes.length === 0 && !isRateLimited && !loading && <NotesNotFound />)}

      <div className='flex flex-wrap gap-2 px-10'>
        {notes.length > 0 && !isRateLimited && 
          notes.map(note => (
            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          ))
        }
      </div>
    </main>
  )
}

export default HomePage