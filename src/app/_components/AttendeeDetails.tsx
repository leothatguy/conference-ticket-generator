"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BiCloudDownload } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Form from "next/form";
import Image from "next/image";

interface SelectTicketProps {
	setFormProgress: (formProgress: number) => void;
}

const AttendeeDetails = ({ setFormProgress }: SelectTicketProps) => {
	const [attendeeImage, setAttendeeImage] = useState<string>("");
	const [attendeeName, setAttendeeName] = useState<string>("");
	const [attendeeEmail, setAttendeeEmail] = useState<string>("");
	const [attendeeSpecialRequest, setAttendeeSpecialRequest] = useState<string>("");
	const [attendeeData, setAttendeeData] = useState<AttendeeDataProps>({} as AttendeeDataProps);

	useEffect(() => {
		const savedData: AttendeeDataProps = JSON.parse(localStorage.getItem("attendeeData") || "{}");

		if (savedData) {
			setAttendeeImage(savedData.attendeeImage || "");
			setAttendeeName(savedData.attendeeName || "");
			setAttendeeEmail(savedData.attendeeEmail || "");
			setAttendeeSpecialRequest(savedData.attendeeSpecialRequest || "");
			setAttendeeData(savedData || {} as AttendeeDataProps);
		}
	}, []);

	const handleNextStep = () => {
		const existingData: AttendeeDataProps = JSON.parse(localStorage.getItem("attendeeData") || "{}");
		const updatedData: AttendeeDataProps = {
			...existingData,
			attendeeImage,
			attendeeName,
			attendeeEmail,
			attendeeSpecialRequest,
		};

		localStorage.setItem("attendeeData", JSON.stringify(updatedData));
		localStorage.setItem("formProgress", JSON.stringify(100));

		setFormProgress(100);
	};
	const handlePreviousStep = () => {
		localStorage.setItem("formProgress", JSON.stringify(33));
		setFormProgress(33);
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setAttendeeImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="md:p-6 md:py-8 flex flex-col gap-8 box-border rounded-[2rem] w-full border-[#0E464F] md:border border-solid md:bg-[#08252b]">
			<section className="flex flex-col items-center gap-8 p-6 pb-12 rounded-3xl border border-solid border-[#07373F]">
				<p className="w-full font-regular">Upload Profile Photo</p>
				<div className="relative h-48 md:h-[12.5rem] w-full bg-[#00000033] flex items-center">
					<input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />

					{attendeeImage ? (
						<label
							htmlFor="imageUpload"
							className="mx-auto rounded-[2rem] w-60 h-60 font-regular bg-[#0E464F] flex flex-col items-center justify-center gap-4 text-[#FAFAFA] border-[4px] border-solid border-[#24A0B580] cursor-pointer relative group overflow-hidden">
							<Image
								src={attendeeImage}
								width={1000}
								height={1000}
								alt="Profile"
								className="w-full h-full object-cover rounded-[2rem]"
							/>
							{/* Hover Overlay */}
							<div className="absolute inset-0 bg-[#0000004D] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-4">
								<BiCloudDownload size={32} />
								<p className="text-base font-regular text-center">Drag & drop or click to upload</p>
							</div>
						</label>
					) : (
						<label
							htmlFor="imageUpload"
							className="mx-auto rounded-[2rem] w-60 h-60 font-regular bg-[#0E464F] p-6 flex flex-col items-center justify-center gap-4 text-[#FAFAFA] border-[4px] border-solid border-[#24A0B580] cursor-pointer">
							<>
								<BiCloudDownload size={32} />
								<p className="text-base font-regular text-center">Drag & drop or click to upload</p>
							</>
						</label>
					)}
				</div>
			</section>
			<div className="w-full h-1 bg-[#07373F]"></div>
			<Form action={handleNextStep} className="flex flex-col gap-8">
				<section className="flex flex-col gap-2">
					<p className="w-full font-regular">Enter your name</p>
					<Input
						type="text"
						value={attendeeName}
						onChange={(e) => setAttendeeName(e.target.value)}
						required
						className=""
					/>
				</section>

				<section className="flex flex-col gap-2">
					<p className="w-full font-regular">Enter your email *</p>
					<div className="relative h-fit">
						<MdOutlineEmail size={24} className="absolute left-3 top-[48%] -translate-y-1/2" />
						<Input
							type="email"
							value={attendeeEmail}
							placeholder="hello@avioglagos.io"
							onChange={(e) => setAttendeeEmail(e.target.value)}
							required
							className="pl-10 leading-0"
						/>
					</div>
				</section>

				<section className="flex flex-col gap-2">
					<p className="w-full font-regular">Special request?</p>
					<Textarea
						value={attendeeSpecialRequest}
						placeholder="Enter your special request"
						onChange={(e) => setAttendeeSpecialRequest(e.target.value)}
						maxLength={250}
						required
						className="h-[127px] p-3"
					/>
				</section>

				<section className="flex w-full max-md:flex-col-reverse gap-6">
					<Button
						onClick={() => handlePreviousStep()}
						className="bg-transparent border border-solid border-[#24A0B5] hover:bg-[#24A0B5]/10 rounded-lg px-6 py-3 w-full h-fit font-jejumyeongjo text-[#24A0B5]">
						Back
					</Button>
					<Button type="submit" className="bg-[#24A0B5] text-white rounded-lg px-6 py-3 w-full h-fit font-jejumyeongjo">
						Get My {attendeeData?.ticketType?.charAt(0).toUpperCase() + attendeeData?.ticketType?.slice(1) } Ticket
					</Button>
				</section>
			</Form>
		</div>
	);
};

export default AttendeeDetails;
