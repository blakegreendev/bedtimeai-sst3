import { type NextPage } from "next";
import Head from "next/head";
import { Navbar, Footer, Button, Label, TextInput } from "flowbite-react";
import Image from "next/image";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { trpc } from "../utils/api";
import { useState } from "react";

const Home: NextPage = () => {
  const [request, setRequest] = useState<{ name?: string; theme?: string }>({});
  const [message, setMessage] = useState("");
  let [story, setStory] = useState<string>("");
  let mutation = trpc.story.useMutation();
  const createStory = () => {
    try {
      if (!request.name || !request.theme) return;
      setMessage("Creating story...");
      let story = mutation.mutate({ name: request.name, theme: request.theme });
      // setStory(story);
      console.log(story);
    } catch (err) {
      console.log("error: ", err);
      // setMessage("");
    }
  };

  return (
    <>
      <Head>
        <title>BedtimeAI</title>
        <meta name="description" content="BedtimeAI" />
        <link rel="icon" href="/bedtime.png" />
      </Head>
      <main className="flex h-screen flex-col justify-between">
        <header className="sticky top-0 z-20 ">
          <Navbar fluid>
            <Navbar.Brand href="/">
              <Image
                alt="Bedtime logo"
                height="24"
                src="/bedtime.png"
                width="24"
              />
              <span className="self-center whitespace-nowrap px-3 text-xl font-semibold dark:text-white">
                BedtimeAI
              </span>
            </Navbar.Brand>
          </Navbar>
        </header>
        <div className="container flex flex-col items-center justify-center">
          <h1 className="text-4xl text-black">BedtimeAI</h1>
          <p className="text-2xl">
            A new story every night! Powered by ChatGPT 🚀
          </p>
        </div>

        <form className="flex flex-col gap-4 px-14">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name1">Name</Label>
            </div>
            <TextInput
              id="name1"
              type="name"
              required
              onChange={(e) =>
                setRequest((request) => ({ ...request, name: e.target.value }))
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="theme1">Theme</Label>
            </div>
            <TextInput
              id="theme1"
              type="theme"
              required
              onChange={(e) =>
                setRequest((request) => ({ ...request, theme: e.target.value }))
              }
            />
          </div>
          <Button
            type="submit"
            onClick={createStory}
            disabled={mutation.isLoading}
          >
            Submit
          </Button>
        </form>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {mutation.error && (
            <p>Something went wrong! {mutation.error.message}</p>
          )}
          {<p className="text-2xl text-black">{message}</p>}
          {story && <p className="text-2xl text-black">{story}</p>}
        </div>
        <Footer container>
          <div className="w-full">
            <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1"></div>
            <Footer.Divider />
            <div className="w-full sm:flex sm:items-center sm:justify-between">
              <Footer.Copyright
                href="https://blakegreen.dev"
                by="blakegreendev"
                year={2023}
              />
              <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                <Footer.Icon
                  href="https://twitter.com/blakegreendev"
                  icon={BsTwitter}
                />
                <Footer.Icon
                  href="https://github.com/blakegreendev"
                  icon={BsGithub}
                />
              </div>
            </div>
          </div>
        </Footer>
      </main>
    </>
  );
};

export default Home;
