import { Avatar } from "@mui/material";

const Testimonial = () => {
  return (
    <div className="testimonial">
      <h2>testimonial</h2>
      <div className="card-container">
        <div className="card1 card">
          <Avatar src=""></Avatar>
          <em>
            Before joining Yashaswi Class, I struggled with understanding
            complex math concepts and always felt nervous during exams. But
            thanks to the personalized attention and the clear explanations from
            my teacher, I started feeling more confident. My math grades
            improved from a C to an A in just one semester! Now I love solving
            math problems and feel prepared for every test
          </em>
          <b> Riya Sharma, 8th Grade Student</b>
        </div>
        <div className="card2 card">
          <Avatar src=""></Avatar>
          <em>
            I was always interested in science but found it difficult to grasp
            certain topics, especially physics. With the help of Yashaswi Class,
            I not only understood the concepts better but also started applying
            them in real-world situations. The interactive classes and practical
            examples helped me achieve 95% in my science final exams! I even won
            a science competition at school, thanks to the confidence I gained
            here.
          </em>
          <b> Aman Verma, 10th Grade Student</b>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
