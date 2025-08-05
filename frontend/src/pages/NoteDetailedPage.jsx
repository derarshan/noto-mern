import { useAuth } from '@clerk/clerk-react';
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';

const NoteDetailedPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); 
  const navigate = useNavigate();
  const { id } = useParams();
  const { getToken } = useAuth();
  
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const token = await getToken();
        const res = await api.get(`/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setNote(res.data);
      } catch (error) {
        console.error("🔴 Fetching notes error: ", error);
        toast.error("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if(!window.confirm("You sure you wanna delete?")) return;

    try {
      const token = await getToken();
      await api.delete(`/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("🔴 Deleting note error: ", error);
      toast.error("Failed to delete note");
    }
  }

  const handleSave = async () => {
    if(!note.title.trim()){
      toast.error("Please add a title")
      return;
    }
    if(!note.content.trim()){
      toast.error("Please add some content")
      return;
    }

    setSaving(true)
    try {
      const token = await getToken();
      await api.put(`/notes/${id}`, note, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Note edited successfully");
      navigate("/")
    } catch (error) {
      console.error("🔴 Editing note error: ", error);
      toast.error("Failed to edit note");
    } finally {
      setSaving(false);
    }
  }

  if(loading){
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">

          {/* Top Bar: Back + Delete */}
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 btn btn-ghost rounded-full hover:bg-transparent transition-transform duration-200 hover:scale-105"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back to Notes</span>
            </Link>

            <button
              onClick={handleDelete}
              className="btn btn-ghost btn-xs text-error hover:bg-transparent transition-transform duration-150 hover:scale-125 rounded-full"
            >
              <Trash2Icon className="5" />
            </button>
          </div>

          {/* Note Edit Card */}
          <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 border border-primary/50 card text-primary-content w-full rounded-2xl shadow-md">
            <div className="card-body">
              <h2 className="text-3xl font-bold text-white mb-6">Edit Note</h2>

              {/* Title Input */}
              <div className="form-control mb-6">
                <label className="label mb-1">
                  <span className="label-text text-white">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  className="input w-full bg-black text-white border-white/10 focus:border-primary focus:outline-none"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              {/* Content Input */}
              <div className="form-control mb-6">
                <label className="label mb-1">
                  <span className="label-text text-white">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea  w-full h-72 resize-none bg-black text-white border-white/10 focus:border-primary focus:outline-none"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              {/* Save Button */}
              <div className="card-actions justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn bg-black text-white hover:bg-black hover:scale-105 transition-transform duration-200 rounded-full min-w-40"
                >
                  {saving ? (
                    <span className="loading loading-infinity loading-lg"></span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  )
}

export default NoteDetailedPage