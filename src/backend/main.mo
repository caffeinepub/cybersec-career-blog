import Int "mo:core/Int";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

actor {
  // Type Definitions
  type BlogPost = {
    title : Text;
    content : Text;
    date : Time.Time;
    tags : [Text];
    summary : Text;
  };

  module BlogPost {
    public func compare(post1 : BlogPost, post2 : BlogPost) : Order.Order {
      Int.compare(post1.date, post2.date);
    };
  };

  type WorkExperience = {
    employer : Text;
    role : Text;
    startDate : Text;
    endDate : Text;
    bulletPoints : [Text];
  };

  type Education = {
    institution : Text;
    degree : Text;
    startDate : Text;
    endDate : Text;
  };

  // State
  let blogPosts = Map.empty<Text, BlogPost>();

  var coverLetter : Text = "";
  var skills : [Text] = [];
  var education : [Education] = [];
  var resumeTitle : Text = "";

  // Initialize with seed data
  public shared ({ caller }) func initialize(coverLetterText : Text, inputSkills : [Text], educations : [Education], inputResumeTitle : Text) : async () {
    if (coverLetter != "") { Runtime.trap("Already initialized") };

    coverLetter := coverLetterText;
    skills := inputSkills;
    education := educations;
    resumeTitle := inputResumeTitle;

    let initialPosts : [(Text, BlogPost)] = [
      (
        "NIST Cybersecurity Framework",
        {
          title = "NIST Cybersecurity Framework";
          content = "The NIST Cybersecurity Framework provides guidelines for organizations to better manage and reduce cybersecurity risk. It consists of five core functions: Identify, Protect, Detect, Respond, and Recover.";
          date = 1640995200000000000;
          tags = ["NIST", "Framework", "Cybersecurity"];
          summary = "Overview of the NIST Cybersecurity Framework and its core functions.";
        },
      ),
      (
        "IT Organizational Roles",
        {
          title = "IT Organizational Roles";
          content = "Understanding IT organizational roles is crucial for effective cybersecurity. Roles include IT managers, security analysts, network engineers, and compliance officers.";
          date = 1641081600000000000;
          tags = ["IT", "Roles", "Organization"];
          summary = "Summary of key IT roles and their responsibilities.";
        },
      ),
      (
        "System Security Officer",
        {
          title = "System Security Officer";
          content = "The System Security Officer is responsible for ensuring systems are secure and compliant with organizational policies. This includes risk assessment, policy enforcement, and incident response.";
          date = 1641168000000000000;
          tags = ["Security", "Officer", "Systems"];
          summary = "The role and responsibilities of a System Security Officer.";
        },
      ),
      (
        "Patch Management Policy",
        {
          title = "Patch Management Policy";
          content = "A robust patch management policy is essential for minimizing vulnerabilities. This involves timely updates, testing patches, and documenting changes.";
          date = 1641254400000000000;
          tags = ["Patch", "Management", "Policy"];
          summary = "Importance of patch management in cybersecurity.";
        },
      ),
      (
        "Cybersecurity Governance and Policy",
        {
          title = "Cybersecurity Governance and Policy";
          content = "Effective cybersecurity governance involves establishing clear policies, roles, and responsibilities. It ensures compliance and aligns security measures with business objectives.";
          date = 1641340800000000000;
          tags = ["Governance", "Policy", "Cybersecurity"];
          summary = "Best practices for cybersecurity governance and policy development.";
        },
      ),
    ];

    for ((key, value) in initialPosts.values()) {
      blogPosts.add(key, value);
    };
  };

  // Query Functions
  public query ({ caller }) func getAllBlogPosts() : async [BlogPost] {
    blogPosts.values().toArray().sort();
  };

  public query ({ caller }) func getBlogPost(title : Text) : async BlogPost {
    switch (blogPosts.get(title)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?post) { post };
    };
  };

  public query ({ caller }) func getBlogPostsByTag(tag : Text) : async [BlogPost] {
    blogPosts.values().toArray().filter(
      func(post) {
        post.tags.find(func(t) { t == tag }) != null;
      }
    );
  };

  public query ({ caller }) func getCoverLetter() : async Text {
    coverLetter;
  };

  public query ({ caller }) func getSkills() : async [Text] {
    skills;
  };

  public query ({ caller }) func getEducation() : async [Education] {
    education;
  };

  public query ({ caller }) func getResumeTitle() : async Text {
    resumeTitle;
  };

  // Admin Functions
  public shared ({ caller }) func setCoverLetter(newCoverLetter : Text) : async () {
    coverLetter := newCoverLetter;
  };

  public shared ({ caller }) func setSkills(newSkills : [Text]) : async () {
    skills := newSkills;
  };

  public shared ({ caller }) func setEducation(newEducation : [Education]) : async () {
    education := newEducation;
  };

  public shared ({ caller }) func setResumeTitle(newTitle : Text) : async () {
    resumeTitle := newTitle;
  };

  public shared ({ caller }) func addBlogPost(title : Text, content : Text, tags : [Text], summary : Text) : async () {
    let post : BlogPost = {
      title;
      content;
      date = Time.now();
      tags;
      summary;
    };
    blogPosts.add(title, post);
  };

  public shared ({ caller }) func updateBlogPost(title : Text, content : Text, tags : [Text], summary : Text) : async () {
    switch (blogPosts.get(title)) {
      case (null) { Runtime.trap("Blog post not found") };
      case (?post) {
        let updatedPost : BlogPost = {
          title = post.title;
          content;
          date = post.date;
          tags;
          summary;
        };
        blogPosts.add(title, updatedPost);
      };
    };
  };

  public shared ({ caller }) func deleteBlogPost(title : Text) : async () {
    if (not blogPosts.containsKey(title)) {
      Runtime.trap("Blog post not found");
    };
    blogPosts.remove(title);
  };
};
