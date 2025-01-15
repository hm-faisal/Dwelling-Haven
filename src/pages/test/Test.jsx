import axios from "axios";

const Test = () => {
  const uploadfile = async (e) => {
    e.preventDefault();
    const imageData = e.target.img.files[0];
    const formData = new FormData();
    formData.append("image", imageData);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );
    console.log(data);
  };
  return (
    <>
      <div>
        <form onSubmit={uploadfile}>
          <input type="file" name="img" multiple={true} />
          <input type="submit" value="Upload" />
        </form>
      </div>
    </>
  );
};

export default Test;
