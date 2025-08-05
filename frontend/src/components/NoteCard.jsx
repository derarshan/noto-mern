import { PenSquare, Trash2Icon, X } from 'lucide-react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils'
import toast from 'react-hot-toast';
import api from '../lib/axios';

const NoteCard = ({ note, setNotes }) => {  
  const handleDelete = async (e, id) => {
    e.preventDefault();
    
    if(!window.confirm("You sure you want to delete this note?")) return;

    try {
      await api.delete(`http://localhost:3000/api/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id))
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("🔴 Deleting error: ", error);
      toast.error("Failed to delete the note");
    }
  };

  return (
    <>
     <Link to={`/note/${note._id}`} className="group">
        <div
          key={note._id}
          className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 border border-primary/50 card text-primary-content w-96 rounded-2xl shadow-md group-hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.015]"
        >
          <div className="card-body">
            {/* Title */}
            <div className="mb-2 pb-2 border-b border-white/10">
              <h2 className="text-xl font-bold text-white leading-snug break-words group-hover:text-primary transition-colors duration-300">
                {note.title}
              </h2>
            </div>

            {/* Content */}
            <pre className="whitespace-pre-wrap break-words font-sans text-sm text-white/90 leading-relaxed">
              {note.content.length > 300
                ? `${note.content.slice(0, 300)}...`
                : note.content}
            </pre>
          </div>

          {/* Footer */}
          <div className="card-actions justify-between items-center mt-2 px-4 pb-4">
            <span className="text-xs text-white/40">{formatDate(note.createdAt)}</span>

            <div className="flex items-center gap-2">
              <PenSquare className="size-5 text-primary opacity-80 group-hover:opacity-100 transition duration-150 hover:scale-125" />

              <button
                className="btn btn-ghost btn-xs text-error hover:bg-transparent transition-transform duration-150 hover:scale-125 rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(e, note._id);
                }}
              >
                <Trash2Icon className="size-5" />
              </button>
            </div>
          </div>
        </div>
    </Link>
    </>
  )
}

export default NoteCard
