import React, { useState } from "react";
import ContactPic from "../assets/contactus.png";
import { useTranslation } from "react-i18next";

// ⬇️ import YOUR reusable dropdown
import PhonePrefixDropdown from "../components/PhonePrefixDropdown"; // <-- adjust path

// Edit the countries as you like

export default function ContactSection() {
  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState(null); // 'loading' | 'sent' | 'error'
  const [errorMsg, setErrorMsg] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const COUNTRY_OPTIONS = [
    { cc: "SY", dial: "+963", label: t("labels.syria") },
    { cc: "SA", dial: "+966", label: t("labels.saudiArabia") },
    { cc: "AE", dial: "+971", label: t("labels.uae") },
    { cc: "TR", dial: "+90", label: t("labels.turkey") },
    { cc: "DE", dial: "+49", label: t("labels.germany") },
  ];

  // phone pieces
  const [dial, setDial] = useState(COUNTRY_OPTIONS[0].dial); // prefix only
  const [phone, setPhone] = useState(""); // local number only

  const [message, setMessage] = useState("");

  const isRTL =
    (typeof i18n.dir === "function" && i18n.dir() === "rtl") ||
    (i18n.language || "").toLowerCase().startsWith("ar");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    // Combine to E.164-like number: prefix + local (strip leading + and 0s)
    const local = phone.trim().replace(/^\+/, "").replace(/^0+/, "");
    const fullPhone = `${dial}${local}`;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      contact_number: fullPhone,
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

      if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);

      setStatus("sent");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || t("common.failed") || "Failed to send.");
    }
  };

  // Helper in case your dropdown returns an object OR a string
  const handleDialChange = (val) => {
    if (typeof val === "string") {
      setDial(val);
    } else if (val && typeof val === "object" && val.dial) {
      setDial(val.dial);
    }
  };

  return (
    <section
      id="contact"
      className="px-4 sm:px-6 lg:px-8 my-16 scroll-mt-[78px]"
    >
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

            <form
              onSubmit={handleSubmit}
              className="w-full"
              dir={isRTL ? "rtl" : "ltr"}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder={t("contact.name")}
                  required
                  className="input w-full max-w-xs rounded-2xl h-14 bg-white border border-slate-200 px-4"
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.08)" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t("contact.email")}
                  required
                  className="input w-full max-w-xs rounded-2xl h-14 bg-white border border-slate-200 px-4"
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.08)" }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* PHONE — prefix dropdown + local number (RTL-aware) */}
                <div className="col-span-1 sm:col-span-2">
                  <label className="w-full">
                    <div
                      dir={isRTL ? "rtl" : "ltr"}
                      className={`flex items-center h-14 rounded-2xl bg-white border border-slate-200 px-3 gap-3
                  ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                      style={{ boxShadow: "0 0 10px rgba(0,0,0,0.08)" }}
                    >
                      {/* Prefix dropdown (your reusable component) */}
                      <PhonePrefixDropdown
                        value={dial}
                        onChange={handleDialChange}
                        options={COUNTRY_OPTIONS}
                        rtl={isRTL} // make its menu open on the right in RTL (add dropdown-end internally)
                      />

                      {/* Local number input */}
                      <input
                        type="tel"
                        name="phone"
                        placeholder={t("contact.phone") || "Phone number"}
                        required
                        // text aligns and caret starts on the right in RTL
                        className={`grow bg-transparent outline-none h-full px-2 text-slate-900
                    ${isRTL ? "text-right" : "text-left"}`}
                        dir={isRTL ? "rtl" : "ltr"} // hard-force direction for the input itself
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        inputMode="tel"
                      />
                    </div>
                  </label>
                </div>
              </div>

              <textarea
                name="message"
                placeholder={t("contact.message")}
                required
                className="textarea bg-white rounded-xl w-full mt-4 h-48 resize-none border border-slate-200"
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
