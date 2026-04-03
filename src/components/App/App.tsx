import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import { FetchNotes } from "../../services/noteService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setModalState(true);
  };
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setModalState(false);
  };

  const handleClose = () => closeModal();

  const {
    data = { notes: [], totalPages: 0 },
    isLoading,
    isFetching,
    isPlaceholderData,
    error,
  } = useQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () => FetchNotes(currentPage, searchQuery),
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 500);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong", {
        duration: 4000,
        position: "top-center",
      });
    }
  }, [error]);

  const showLoader = isLoading || (isFetching && !isPlaceholderData);

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        {showLoader && <Loader />}
        <SearchBox defaultValue={searchQuery} onChange={handleSearch} />
        {data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data.notes.length > 0 && <NoteList notes={data.notes} />}
      {modalState && (
        <Modal onClose={handleClose}>
          <NoteForm onCancel={handleClose} />
        </Modal>
      )}
    </div>
  );
}

export default App;
