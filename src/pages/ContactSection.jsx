import React, { useState } from "react";
import ContactPic from "../assets/contactus.png";
import { useTranslation } from "react-i18next";

export default function ContactSection() {
  const { t } = useTranslation();
  const [status, setStatus] = useState(null); // 'loading' | 'sent' | 'error'
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.blancoone.com/api/contact_us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        throw new Error(data?.message || `HTTP ${res.status}`);
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || t("common.failed") || "Failed to send.");
    }
  };

  return (
    <section id="contact" className="px-4 sm:px-6 lg:px-8 my-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white">
          {/* Header */}
          <div className="text-center px-6 sm:px-10 pt-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              <span>✨ {t("contact.getIn")}</span>{" "}
              <span className="text-[#00AFDF]">{t("contact.touch")}</span>
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl font-semibold text-[#061B2D]">
              {t("contact.description")}
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start px-6 sm:px-10 pb-10 pt-6">
            <div className="flex justify-center lg:justify-start">
              <img
                src={ContactPic}
                alt="Contact illustration"
                width={330}
                height={272}
                className="w-[330px] h-[272px] object-cover drop-shadow"
              />
            </div>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder={t("contact.name")}
                  required
                  className="input w-full max-w-xs"
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.08)" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t("contact.email")}
                  required
                  className="input w-full max-w-xs"
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.08)" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <textarea
                name="message"
                placeholder={t("contact.message")}
                required
                className="textarea bg-white rounded-xl w-full mt-4 h-48 resize-none"
                style={{ boxShadow: "0 0 10px rgba(0,0,0,0.08)" }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn btn-lg rounded-2xl px-10 mt-4 text-white border-none bg-[#00AFDF] hover:bg-[#0096bf] disabled:opacity-60"
                >
                  {status === "loading"
                    ? t("common.sending") || "Sending…"
                    : t("contact.send")}
                </button>
              </div>

              {status === "sent" && (
                <div className="alert alert-success mt-4 rounded-2xl">
                  <span>
                    {t("contact.alert") || "Message sent successfully!"}
                  </span>
                </div>
              )}
              {status === "error" && (
                <div className="alert alert-error mt-4 rounded-2xl">
                  <span>{errorMsg}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
