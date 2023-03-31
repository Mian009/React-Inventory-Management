import { Fragment, useContext, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AuthContext from "../AuthContext";

export default function AddProduct() {
  const authContext = useContext(AuthContext);
  const [product, setProduct] = useState({
    userId: authContext.user,
    name: "",
    manufacturer: "",
    description: "",
  });
  // console.log("Product: ", product);
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);



  const addProduct = () => {
    fetch("http://localhost:4000/api/Product/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((result) => {
        alert("Product ADDED", result);
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-bold leading-6 text-gray-900 "
                        >
                          Add Product
                        </Dialog.Title>

                        <form>
                          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                              <label
                                class="text-md font-medium text-gray-700 dark:text-gray-900"
                                htmlfor="username"
                              >
                                Product Name
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-200 dark:text-gray-00 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                onChange={(e) =>
                                  setProduct({
                                    ...product,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div>
                              <label
                                class="text-md font-medium text-gray-700 dark:text-gray-900"
                                for="manufacturer"
                              >
                                Manufacturer
                              </label>
                              <input
                                type="text"
                                name="manufacturer"
                                id="manufacturer"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-200 dark:text-gray-900 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                onChange={(e) =>
                                  setProduct({
                                    ...product,
                                    manufacturer: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div class="sm:col-span-2">
                              <label
                                for="description"
                                class="block mb-4 text-md font-medium text-gray-900 dark:text-black"
                              >
                                Description
                              </label>
                              <textarea
                                id="description"
                                rows="5"
                                name="description"
                                className="block p-2.5 w-full text-sm text-black-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-200 dark:border-gray-900 dark:placeholder-black-900 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Write a description..."
                                onChange={(e) =>
                                  setProduct({
                                    ...product,
                                    description: e.target.value,
                                  })
                                }
                              ></textarea>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={addProduct}
                    >
                      Add Product
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
