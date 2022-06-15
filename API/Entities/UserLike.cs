namespace API.Entities
{
    ///<summary> Join entity created to manage a many-to-many relationship </summary>
    public class UserLike
    {
        ///<summary> The user liking the other user</summary>
        public AppUser SourceUser { get; set; }

        ///<summary> The ID of the user linking the other user  </summary>
        public int SourceUserId { get; set; }

        ///<summary> The user being liked</summary>
        public AppUser LikedUser { get; set; }

        ///<summary> The ID of the user being liked  </summary>
        public int LikedUserId { get; set; }
    }
}