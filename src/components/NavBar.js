import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
	ArrowPathIcon,
	Bars3Icon,
	BookmarkSquareIcon,
	CalendarIcon,
	ChartBarIcon,
	CursorArrowRaysIcon,
	LifebuoyIcon,
	PhoneIcon,
	PlayIcon,
	ShieldCheckIcon,
	Squares2X2Icon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import logo from "../assets/images/cassette-tape-256.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
	return (
		<div className="fixed w-full z-10">
			<Popover className=" bg-primary">
				<div className="mx-auto max-w-7xl px-4 sm:px-6">
					<div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
						<div className="flex justify-start lg:w-0 lg:flex-1">
							<a href="#">
								<img className="h-8 w-auto sm:h-10" src={logo} alt="" />
							</a>
							<span className="text-2xl font-press-start pl-5 pt-1">blockmix</span>
						</div>
						<div className="-my-2 -mr-2 md:hidden">
							<Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
								<span className="sr-only">Open menu</span>
								<Bars3Icon className="h-6 w-6" aria-hidden="true" />
							</Popover.Button>
						</div>
						<Popover.Group as="nav" className="hidden space-x-10 md:flex">
							<a
								href="/mix"
								className="text-base font-medium text-gray-500 hover:text-gray-900"
							>
								mix
							</a>
							<a
								href="/play"
								className="text-base font-medium text-gray-500 hover:text-gray-900"
							>
								play
							</a>
							<a
								href="/explore"
								className="text-base font-medium text-gray-500 hover:text-gray-900"
							>
								explore
							</a>
						</Popover.Group>
						<div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
							<ConnectButton />
						</div>
					</div>
				</div>

				<Transition
					as={Fragment}
					enter="duration-200 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Popover.Panel
						focus
						className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
					>
						<div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
							<div className="space-y-6 py-6 px-5">
								<div className="grid grid-cols-2 gap-y-4 gap-x-8">
									<a
										href="/mix"
										className="text-base font-medium text-gray-900 hover:text-gray-700"
									>
										mix
									</a>

									<a
										href="/play"
										className="text-base font-medium text-gray-900 hover:text-gray-700"
									>
										play
									</a>
									<a
										href="/explore"
										className="text-base font-medium text-gray-900 hover:text-gray-700"
									>
										explore
									</a>
								</div>
								<div>
									<ConnectButton />
								</div>
							</div>
						</div>
					</Popover.Panel>
				</Transition>
			</Popover>
		</div>
	);
}
