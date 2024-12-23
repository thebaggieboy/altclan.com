import Image from "next/image";
import { useState } from "react";
import FormInput from "./FormInput";
import { useDispatch, useSelector } from "react-redux";
import { USER_TYPES, selectUser, setUser } from "../features/user/userSlice";
import Loader from "./Loader"
import useUpdateProfileData from "../hooks/useUpdateProfileData";
import { selectBrandUser } from "../features/brands/brandUserSlice";
import useChangePassword from "../hooks/useChangePassword";
import { MdErrorOutline, MdOutlineCheck } from "react-icons/md";

export default function ProfileForm({ type, onSubmit, onClose, defaultData }) {
	
	const user = useSelector(selectUser);
	const brand = useSelector(selectBrandUser)


	const { personal, login } = defaultData;
	const { isPending, error, mutateAsync: updateFn, } = useUpdateProfileData("https://altclan-api-v1.onrender.com/api/users/", user?.id, setUser)
	const { isPending: pwdChangePending, error: pwdChangeErr, data, mutateAsync: changePassword } = useChangePassword(false)

	const defaultState = {
		first_name: "",
		last_name: "",
		mobile_number: "",
	}

	const defaultLoginState = {
		new_password1: "",
		new_password2: "",
		old_password: ""
	}

	const [personalData, setPersonalData] = useState({
		first_name: personal.firstName,
		last_name: personal.lastName,
		mobile_number: personal.phone,
	});

	const [loginData, setLoginData] = useState({
		new_password1: "",
		new_password2: "",
		old_password: ""
	})



	function handlePersonalData(e) {
		const { value, name } = e.target;
		setPersonalData((prevValue) => {
			return { ...prevValue, [name]: value };
		});
	}

	const [succesMsg, setSuccessMsg] = useState("")


	function handleLoginData(e) {
		const { value, name } = e.target;
		setLoginData((prevValue) => {
			return { ...prevValue, [name]: value };
		});
	}



	const { first_name, last_name, mobile_number } = personalData;
	const { new_password1, new_password2, old_password } = loginData

	const personalDataSubmit = async (e) => {
		e.preventDefault()
		try {
			await updateFn(personalData)
			setPersonalData(defaultData)
		} catch (error) {
			console.log(error)
		}
	}

	const loginDataSubmit = async (e) => {
		e.preventDefault()
		console.log(loginData)
		try {
			const res = await changePassword(loginData)
			setLoginData(defaultLoginState)
			setSuccessMsg(res.message)
			setTimeout(() => {
				onClose()
				setSuccessMsg("")
			}, 1300)
			console.log(res.message)
		} catch (error) {
			console.log(error)
		}
	}


	const StatusMessages = () => {
		return (
			<>
				{
					pwdChangeErr && (
						<h1 className="my-2 mt-4 text-xs md:text-sm bg-red-300 p-2 rounded font-medium flex items-center gap-2">
							<div className=" w-[2rem]">
								<MdErrorOutline className="w-4 h-4" />
							</div>
							<div className=" flex items-center gap-x-1 flex-wrap">{
								pwdChangeErr.new_password2.map((msg) => (
									<span key={msg}>{msg}</span>
								))
							}</div>
						</h1>
					)
				}
				{
					succesMsg !== "" && (
						<h1 className="my-2 mt-4 text-xs md:text-sm bg-green-300 p-2 rounded font-medium flex items-center gap-x-2">
							<div className="w-[2rem]">
								<MdOutlineCheck className="w-4 h-4" />
							</div>
							<span>{succesMsg}</span>
						</h1>
					)
				}
			</>
		)
	}




	if (type === "personal") {
		return (
			<div className="max-w-[40rem] mx-auto px-4 md:px-8  py-8 bg-white relative">
				<button className="absolute top-3 right-4" onClick={() => onClose()}>
					<Image src="/assets/cross.svg" width={30} height={30} alt="cross" />
				</button>
				<h1 className="text-xl font-bold mb-8">Edit personal details</h1>
				<form className="flex flex-col gap-y-4 " onSubmit={personalDataSubmit}>
					<FormInput
						label="First name"
						name="first_name"
						type="text"
						value={first_name}
						onChange={handlePersonalData}
						disabled={pwdChangePending}
					/>
					<FormInput
						label="Last name"
						name="last_name"
						type="text"
						value={last_name}
						onChange={handlePersonalData}
						disabled={pwdChangePending}
					/>
					<FormInput
						label="Phone number"
						name="mobile_number"
						type="number"
						value={mobile_number}
						onChange={handlePersonalData}
						disabled={pwdChangePending}
					/>
					<button  className=" disabled:bg-gray-300 px-4 py-2 mt-4 bg-black text-white md:text-xl rounded-sm self-start">
						{isPending ? <Loader /> : "Save"}
					</button>
				</form>
			</div>
		);
	}

	if (type === "login") {
		return (
			<div className="max-w-[40rem] py-8 mx-auto px-4 md:px-8 bg-white relative">
				<button className="absolute top-3 right-4" onClick={() => onClose()}>
					<Image src="/assets/cross.svg" width={30} height={30} alt="cross" />
				</button>

				<StatusMessages />
				<h1 className="text-xl font-bold mb-4">Edit login details</h1>
				<form className="flex flex-col gap-y-4 " onSubmit={loginDataSubmit}>
					<FormInput
						label="Previous password"
						type="password"
						name="old_password"
						value={old_password}
						onChange={handleLoginData}
					/>
					<FormInput
						label="New password"
						type="password"
						name="new_password1"
						value={new_password1}
						onChange={handleLoginData}
					/>
					<FormInput
						label="New password confirm"
						type="password"
						name="new_password2"
						value={new_password2}
						onChange={handleLoginData}
					/>
					<button disabled={pwdChangePending} className="disabled:bg-gray-300 disabled:border disabled:border-black px-4 mt-4 py-1 bg-black text-white md:text-xl rounded-sm self-start">
						{pwdChangePending ? <Loader /> : "Submit"}
					</button>
				</form>
			</div>
		);
	}
}
