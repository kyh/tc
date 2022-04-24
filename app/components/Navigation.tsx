import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Logo } from "~/components/Logo";
import { About } from "~/components/About";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <nav className="relative max-w-7xl mx-auto flex justify-between mb-10">
      <a href="/" className="inline-flex py-5 px-3">
        <span className="sr-only">Logo</span>
        <Logo />
      </a>
      <div className="flex items-center md:gap-4">
        <button type="button" className="p-3" onClick={openModal}>
          About
        </button>
        <a
          className="p-3"
          href="https://github.com/kyh/tc"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-black rounded-2xl text-slate-200 text-sm">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-slate-50"
                >
                  About
                </Dialog.Title>
                <About />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
};
