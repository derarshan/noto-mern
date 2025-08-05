import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import api from "../lib/axios";

const CreatePage = () => {

  const { getToken } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!title.trim()){
      toast.error("Title is required");
      return;
    }
    if(!content.trim()){
      toast.error("Content is required");
      return;
    }
    setLoading(true)
    try {
      const token = await getToken();
      await api.post("/notes", { title, content }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
      });
      toast.success("Note created successfully");
      navigate("/")
    } catch (error) {
      console.error("🔴 Creating note error: ", error);
      toast.error("Failed to create the note")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">

          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm btn btn-ghost mb-6 rounded-full transition-transform duration-200 hover:scale-105 hover:bg-transparent"
          >
            <ArrowLeftIcon className="size-5" />
            <span>Back to Notes</span>
          </Link>

          {/* Styled Note Form Card */}
          <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 border border-primary/50 card text-primary-content w-full rounded-2xl shadow-md transition-all duration-300">
            <div className="card-body">

              {/* Heading */}
              <h2 className="text-3xl font-bold text-white mb-6 leading-snug">
                Create New Note
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title Field */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text text-white">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    className="input w-full bg-black text-white border-white/20 focus:border-primary/70 focus:outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content Field */}
                <div>
                  <label className="label mb-1">
                    <span className="label-text text-white">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your content here..."
                    className="textarea w-full h-72 resize-none bg-black text-white border-white/20 focus:border-primary/70 focus:outline-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn bg-black text-white hover:bg-black hover:scale-105 transition-transform duration-200 rounded-full min-w-40"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-infinity loading-lg"></span>
                    ) : (
                      "Create Note"
                    )}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default CreatePage