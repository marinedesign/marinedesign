import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "./Button";

function Joinus() {
  const form = useRef();
  const [messageSent, setMessageSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_KEY,
        import.meta.env.VITE_JOIN_TEMPLATE_KEY,
        form.current,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          form.current.reset();
          setMessageSent(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="px-4 md:px-12 xl:px-0">
      <section
        id="joinus"
        className="bg-[#183049] py-12 min-h-[75vh] px-4 flex flex-col justify-between rounded-2xl"
      >
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-8 text-white">
          Join the Marine Design Team!
        </h2>
        <div className="flex-grow flex flex-col justify-center">
          <form
            ref={form}
            onSubmit={sendEmail}
            className="w-full max-w-lg mx-auto"
          >
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold text-white"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-white"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="inquiry"
                className="block mb-2 text-sm font-semibold text-white"
              >
                Message:
              </label>
              <textarea
                id="inquiry"
                name="message"
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <Button type="submit">Submit</Button>
              {messageSent && (
                <p className="mt-4 text-sm text-white">
                  Thank you for your interest! We will get back to you soon.
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Joinus;
