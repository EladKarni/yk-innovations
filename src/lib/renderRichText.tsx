import { ReactElement } from "react";

export function renderRichText(richText: any): ReactElement {
  if (!richText) return <></>;
  if (typeof richText === "string") return <p>{richText}</p>;

  if (richText.root && richText.root.children) {
    return (
      <>
        {richText.root.children.map((node: any, index: number) => {
          if (node.type === "list") {
            const ListTag = node.listType === "bullet" ? "ul" : "ol";
            return (
              <ListTag key={index} className="list-disc list-inside space-y-2 mb-4 text-lg text-base-content/80">
                {node.children?.map((listItem: any, liIndex: number) => (
                  <li key={liIndex} className="ml-4">
                    {listItem.children?.map((child: any) => child.text || "").join("")}
                  </li>
                ))}
              </ListTag>
            );
          }

          if (node.type === "paragraph") {
            const text = node.children?.map((child: any, childIndex: number) => {
              if (child.type === "text" || child.text) {
                let element: any = child.text;
                if (child.format & 1) element = <strong key={childIndex}>{element}</strong>;
                if (child.format & 2) element = <em key={childIndex}>{element}</em>;
                return element;
              }
              return "";
            });
            return <p key={index} className="mb-4 text-lg text-base-content/80 leading-relaxed">{text}</p>;
          }

          if (node.type === "heading") {
            const text = node.children?.map((child: any) => child.text || "").join("");
            const level = node.tag || "h3";
            const className = "font-bold text-base-content mb-3";
            switch (level) {
              case "h1": return <h1 key={index} className={className}>{text}</h1>;
              case "h2": return <h2 key={index} className={className}>{text}</h2>;
              case "h3": return <h3 key={index} className={className}>{text}</h3>;
              case "h4": return <h4 key={index} className={className}>{text}</h4>;
              case "h5": return <h5 key={index} className={className}>{text}</h5>;
              case "h6": return <h6 key={index} className={className}>{text}</h6>;
              default:   return <h3 key={index} className={className}>{text}</h3>;
            }
          }

          return null;
        })}
      </>
    );
  }

  return <></>;
}
