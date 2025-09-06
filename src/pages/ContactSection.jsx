import React, { useState } from "react";
import ContactPic from "../assets/contactus.png";

export default function ContactSection() {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    };

    // TODO: send `payload` to your backend / API route
    // await fetch("/api/contact", { method: "POST", body: JSON.stringify(payload) })

    setStatus("sent");
    e.currentTarget.reset();
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 my-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white">
          {/* Header */}
          <div className="text-center px-6 sm:px-10 pt-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              <span>✨ Get In</span>{" "}
              <span className="text-[#00AFDF]">Touch</span>
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-base-content/70 text-xl font-semibold text-[#061B2D]">
              Ready to experience professional cleaning services? Contact us
              today for a free consultation and a customized cleaning plan for
              your business.
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start px-6 sm:px-10 pb-10 pt-6">
            {/* Left image */}
            <div className="flex justify-center lg:justify-start">
              <img
                src={ContactPic}
                alt="Contact illustration"
                width={330}
                height={272}
                className="w-[330px] h-[272px] object-cover drop-shadow"
              />
            </div>

            {/* Right form */}
            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="input w-full max-w-xs"
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.08)" }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="input w-full max-w-xs"
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.08)" }}
                />
              </div>

              <textarea
                name="message"
                placeholder="Your Message"
                required
                className="textarea bg-white rounded-xl w-full mt-4 h-48 resize-none"
                style={{ boxShadow: "0 0 10px rgba(0,0,0,0.08)" }}
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-lg rounded-2xl px-10 mt-4 text-white border-none bg-[#00AFDF] hover:bg-[#0096bf]"
                >
                  Send
                </button>
              </div>

              {status === "sent" && (
                <div className="alert alert-success mt-4 rounded-2xl">
                  <span>Thanks! Your message has been sent.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
