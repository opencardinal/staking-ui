import { FaDiscord } from 'react-icons/fa'
import { SOCIALS } from './Footer'

export const FooterSlim = () => {
  return (
    <div className="mt-14 w-full px-4 py-4">
      <div className="flex flex-col items-center justify-between gap-8 rounded-xl py-4 px-8 md:flex-row">
        <div className="flex gap-5 text-2xl text-gray-200 md:text-lg">
          <a
            href="https://discord.gg/QQDSUnQefC"
            target="_blank"
            rel="noreferrer"
            className={`transition-colors hover:text-primary`}
          >
            <FaDiscord />
          </a>
        </div>
        <div className="flex flex-col gap-8 text-center text-base text-medium-4 md:flex-row md:text-left">
          {/* <a
            href="https://docs.cardinal.so/"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer transition-colors hover:text-primary"
          >
            Documentation
          </a> */}
          <a
            href="https://github.com/opencardinal"
            target="_blank"
            rel="noreferrer"
            className="cursor-pointer transition-colors hover:text-primary"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  )
}
