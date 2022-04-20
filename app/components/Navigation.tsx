import { Fragment, useState } from "react";
import { Dialog, Transition, Tab } from "@headlessui/react";
import { Logo } from "~/components/Logo";

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
                <div className="mt-5">
                  <p>Navigating startup compensation is no easy feat</p>
                </div>
                <Tab.Group>
                  <Tab.List className="flex p-1 space-x-1 bg-emerald-50/20 rounded-xl mt-2">
                    <Tab
                      className={({ selected }) =>
                        `w-full py-2.5 text-sm leading-5 font-medium text-emerald-600 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-emerald-400 ring-white ring-opacity-60 ${
                          selected
                            ? "bg-white shadow"
                            : "hover:text-emerald-300"
                        }`
                      }
                    >
                      Cash Compensation
                    </Tab>
                    <Tab
                      className={({ selected }) =>
                        `w-full py-2.5 text-sm leading-5 font-medium text-emerald-600 rounded-lg focus:outline-none focus:ring-2 ring-offset-2 ring-offset-emerald-400 ring-white ring-opacity-60 ${
                          selected
                            ? "bg-white shadow"
                            : "hover:text-emerald-300"
                        }`
                      }
                    >
                      Equity Compensation
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel>
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Atque, iusto! Perferendis asperiores deserunt
                        aliquam obcaecati quas, omnis iusto dicta odio
                        molestias. Libero aliquam voluptas eligendi aperiam eius
                        nesciunt culpa voluptatum!
                      </p>
                      <p className="mt-2">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Atque, iusto! Perferendis asperiores deserunt
                        aliquam obcaecati quas, omnis iusto dicta odio
                        molestias. Libero aliquam voluptas eligendi aperiam eius
                        nesciunt culpa voluptatum!
                      </p>
                    </Tab.Panel>
                    <Tab.Panel>
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Atque, iusto! Perferendis asperiores deserunt
                        aliquam obcaecati quas, omnis iusto dicta odio
                        molestias. Libero aliquam voluptas eligendi aperiam eius
                        nesciunt culpa voluptatum!
                      </p>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
};
