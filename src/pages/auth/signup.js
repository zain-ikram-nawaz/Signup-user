import Form from "@/components/auth/form";
// import { useSession } from "next-auth/react";

export default function SignUp() {
  // const session ={useSession}
  // console.log(session)
  const onSubmit = async (email, password) => {
    try {
      const reponse = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (reponse.ok) {
        alert("signup sucessful");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return <Form signin={false} onFormSubmit={onSubmit} />;
}
