import { type NextPage } from "next";
import Head from "next/head";
import { Footer, Button, Label, TextInput } from "flowbite-react";
import Image from "next/image";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { trpc } from "../utils/api";
import { useState } from "react";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [story, setStory] = useState("");
  // const [imageUrl, setImageUrl] = useState("");

  const createStory = trpc.story.useMutation({
    onSuccess: (data) => {
      setName("");
      setTheme("");
      // console.log(data);
      const storyContent = data.choices[0]?.message?.content as string;
      // const convertedStory = storyContent.replace(/\\n/g, " ");
      //const storyContent = data.story.choices[0]?.message?.content as string;
      setStory(storyContent);
      // const imageUrl = data.image.data[0]?.url as string;
      // setImageUrl(imageUrl);
    },
  });

  return (
    <>
      <Head>
        <title>BedtimeAI</title>
        <meta name="description" content="BedtimeAI" />
        <link rel="icon" href="/bedtime.png" />
      </Head>
      <main className="flex h-screen flex-col bg-white dark:bg-gray-900">
        <nav className="border-gray-200 bg-white dark:bg-gray-900">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <a href="/" className="flex items-center">
              <img src="/bedtime.png" className="mr-3 h-8" alt="Bedtime Logo" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                BedtimeAI
              </span>
            </a>
          </div>
        </nav>
        <div className="bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              BedtimeAI
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:px-48 lg:text-xl">
              A new bedtime story every night! Powered by ChatGPT 🚀
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!name || !theme) {
              alert("Please enter a name and theme");
            }
            createStory.mutate({ name, theme });
          }}
          className="flex flex-col gap-4 bg-white px-14 dark:bg-gray-900"
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

        {/* <div className="grid grid-cols-1 gap-6 bg-white px-14 py-5 dark:bg-gray-900 sm:grid-cols-3">
          <div className="col-span-2"> */}
        <p className="mb-3 bg-white px-14 py-5 text-gray-500 first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 first-line:uppercase first-line:tracking-widest dark:bg-gray-900 dark:text-gray-400 dark:first-letter:text-gray-100">
          {story}
        </p>
        {createStory.isLoading && (
          <button
            disabled
            type="button"
            className="mr-2 inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-14 py-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
            Creating a Story for {name}...
          </button>
        )}
        {/* </div> */}
        {/* <Image
            src={imageUrl}
            placeholder="empty"
            alt="Story Image"
            className="mb-3 text-gray-500 dark:text-gray-400"
          /> */}
        {/* </div> */}
        <footer className="fixed bottom-0 left-0 z-20 w-full border-t border-gray-200 bg-white p-4 shadow dark:border-gray-600 dark:bg-gray-800 md:flex md:items-center md:justify-between md:p-6">
          <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
            © 2023{" "}
            <a href="https://blakegreen.dev/" className="hover:underline">
              ❤️ blakegreendev
            </a>
            . All Rights Reserved.
          </span>
          <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li className="px-4">
              <Footer.Icon
                href="https://twitter.com/blakegreendev"
                icon={BsTwitter}
              />
            </li>
            <li>
              <Footer.Icon
                href="https://github.com/blakegreendev"
                icon={BsGithub}
              />
            </li>
          </ul>
        </footer>
      </main>
    </>
  );
};

export default Home;
