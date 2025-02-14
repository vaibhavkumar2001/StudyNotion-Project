import UpdatePassword from "../../../../pages/UpdatePassword"
import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"



export default function Settings() {
    return (
        <>
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Edit Profile
          </h1>
          {/* Change the Profile Picture */}
          <ChangeProfilePicture/>
          {/* Edit the profile */}
          <EditProfile/>
          {/* Update the password */}
          <UpdatePassword/>
          {/* Delete the account */}
          <DeleteAccount/>
        </>
    )
}