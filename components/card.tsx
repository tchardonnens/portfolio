import React from 'react';

type CardProps = {
  title: string;
  description: string;
  linkProd?: string;
  linkRepo?: string;
  backendStack?: string;
  frontendStack?: string;
};

export function ProjectLinks({ linkProd, linkRepo }: { linkProd?: string; linkRepo?: string }) {
  return (
    <div className="tb-card-links">
      {linkProd && (
        <a href={linkProd} target="_blank" rel="noopener noreferrer" className="tb-link-gold">
          Visit <span aria-hidden="true">→</span>
        </a>
      )}
      {linkRepo && (
        <a href={linkRepo} target="_blank" rel="noopener noreferrer" className="tb-link-gold">
          Source <span aria-hidden="true">→</span>
        </a>
      )}
    </div>
  );
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  linkProd,
  linkRepo,
  backendStack,
  frontendStack,
}) => {
  return (
    <article className="tb-card">
      <h3 className="tb-card-title">{title}</h3>
      <p className="tb-card-text">{description}</p>
      <dl className="tb-stack">
        {backendStack && (
          <div>
            <dt>Built with</dt>
            <dd>{backendStack}</dd>
          </div>
        )}
        {frontendStack && (
          <div>
            <dt>Runs on</dt>
            <dd>{frontendStack}</dd>
          </div>
        )}
      </dl>
      <ProjectLinks linkProd={linkProd} linkRepo={linkRepo} />
    </article>
  );
};

export default Card;
