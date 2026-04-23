import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import rehypeKatex from 'rehype-katex';

function isExternalHref(href?: string) {
  if (!href) return false;
  return /^https?:\/\//i.test(href);
}

export default function RenderedContent({ content }: { content: string }) {
  return (
    <div className="formatted-content">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkBreaks]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1({ children }) {
            return <h1>{children}</h1>;
          },
          h2({ children }) {
            return <h2>{children}</h2>;
          },
          h3({ children }) {
            return <h3>{children}</h3>;
          },
          h4({ children }) {
            return <h4>{children}</h4>;
          },
          p({ children }) {
            return <p>{children}</p>;
          },
          ul({ children }) {
            return <ul>{children}</ul>;
          },
          ol({ children }) {
            return <ol>{children}</ol>;
          },
          li({ children }) {
            return <li>{children}</li>;
          },
          strong({ children }) {
            return <strong>{children}</strong>;
          },
          blockquote({ children }) {
            return <blockquote>{children}</blockquote>;
          },
          hr() {
            return <hr />;
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target={isExternalHref(href) ? '_blank' : undefined}
                rel={isExternalHref(href) ? 'noreferrer noopener' : undefined}
              >
                {children}
              </a>
            );
          },
          code({ children, className }) {
            return <code className={className}>{children}</code>;
          },
          pre({ children }) {
            return <pre>{children}</pre>;
          },
          table({ children }) {
            return (
              <div style={{ overflowX: 'auto' }}>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    minWidth: 520
                  }}
                >
                  {children}
                </table>
              </div>
            );
          },
          th({ children }) {
            return (
              <th
                style={{
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--text)'
                }}
              >
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td
                style={{
                  padding: '10px 12px',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--text-soft)',
                  verticalAlign: 'top'
                }}
              >
                {children}
              </td>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}