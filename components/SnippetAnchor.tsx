type SnippetAnchorProps = {
  title?: string;
  description: string;
};

export default function SnippetAnchor({
  title = "What is BadCreditFirst?",
  description,
}: SnippetAnchorProps) {
  return (
    <section className="snippet-anchor">
      <h2>{title}</h2>
      <p>{description}</p>
      <p className="trust-line">
        Content is reviewed for accuracy and updated regularly to reflect current credit card and credit scoring
        practices.
      </p>
    </section>
  );
}
