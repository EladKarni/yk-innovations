"use client";

import MailIcon from "@/ui/icons/mail";
import PersonIcon from "@/ui/icons/person";
import PhoneIcon from "@/ui/icons/phone";
import InputBox from "@/ui/InputBox";
import SectionContainer from "@/ui/SectionContainer";
import SubtitleText from "@/ui/SubtitleText";
import TitleText from "@/ui/TitleText";
import { useRouter } from "next/navigation";

const Contact = () => {
  const router = useRouter();

  const handleSubmit = (event: { preventDefault: () => void; target: any }) => {
    event.preventDefault();

    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch("__form.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // @ts-ignore
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => router.push("/success"))
      .catch((error) => alert(error));
  };

  return (
    <SectionContainer
      sectionClasses="text-center bg-base-200 py-6 mt-4"
      innerContainerClasses="flex flex-col gap-8"
      sectionName="contact"
      isFullWidth
    >
      <div>
        <TitleText>Start Your Projects Today</TitleText>
        <SubtitleText>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, officia
          perferendis quisquam fugiat nostrum ipsam distinctio.
        </SubtitleText>
      </div>
      <form
        className="flex flex-col gap-4"
        name="contact"
        method="post"
        netlify-honeypot="bot-field"
        data-netlify-recaptcha="true"
        action={"/success"}
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        <InputBox
          id={"htmlName"}
          field={"name"}
          placeholder={"Your Name"}
          inputType={"text"}
        >
          <PersonIcon />
        </InputBox>
        <p className="hidden">
          <label>
            {"Don’t fill this out if you’re human: "}
            <input name="bot-field" />
          </label>
        </p>
        <input type="hidden" name="form-name" value="contact" />
        <InputBox
          id={"htmlEmail"}
          field={"email"}
          placeholder={"Your Email"}
          inputType={"email"}
        >
          <MailIcon />
        </InputBox>
        <InputBox
          id={"htmlPhone"}
          field={"phone"}
          placeholder={"Your phone"}
          inputType={"tel"}
        >
          <PhoneIcon />
        </InputBox>
        <textarea
          required
          className="input input-bordered flex items-center gap-2 min-h-48 text-black"
          placeholder="Message"
          name="message"
          id="yourmessage"
        />
        <div data-netlify-recaptcha="true"></div>

        <button
          type="submit"
          value="Submit"
          className="btn btn-primary w-40 mb-4 mx-auto text-base-100"
        >
          Send
        </button>
      </form>
    </SectionContainer>
  );
};

export default Contact;
