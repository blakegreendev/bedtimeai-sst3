import { type NextPage } from "next";
import Head from "next/head";
import { Navbar, Footer, Button, Label, TextInput } from "flowbite-react";
import Image from "next/image";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { trpc } from "../utils/api";
import { useState } from "react";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [story, setStory] = useState("");

  const createStory = trpc.story.useMutation({
    onSuccess: (data) => {
      setName("");
      setTheme("");
      // console.log(data);
      const storyContent = data.choices[0]?.message?.content as string;
      // const convertedStory = storyContent.replace(/\\n/g, " ");
      setStory(storyContent);
    },
  });

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
            A new bedtime story every night! Powered by ChatGPT 🚀
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!name || !theme) {
              alert("Please enter a name and theme");
            }
            createStory.mutate({ name, theme });
          }}
          className="flex flex-col gap-4 px-14"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name1">Name</Label>
            </div>
            <TextInput
              id="name1"
              type="name"
              required
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              value={name}
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
              placeholder="Enter theme"
              onChange={(e) => setTheme(e.target.value)}
              value={theme}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
        <div className="flex flex-col gap-4 px-14">
          <div className="h-full w-full overflow-y-scroll pb-52">
            <div className="text-med flex items-center justify-center space-x-4 p-6 px-52 text-black dark:text-white">
              <div className="flex w-full max-w-xl items-start justify-center space-x-4">
                <div className="w-full">{story}</div>
              </div>
            </div>

            {createStory.isLoading && (
              <button
                disabled
                type="button"
                className="mr-2 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="mr-3 inline h-4 w-4 animate-spin text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading Story...
              </button>
            )}
          </div>
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
