import { Badge } from '@/components/Badge';
import { Block, BlockContent } from '@/components/Block';

const typeColors = {
  'Personal': 'text-blue-600',
  'Professional': 'text-green-600',
  'Freelance': 'text-purple-600'
} as const;

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link: string;
  type: keyof typeof typeColors;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {

  const content = (
    <BlockContent>
      <header>
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold">{project.name}</h2>
          <span className={`text-sm font-medium ${typeColors[project.type]}`}>
            {project.type}
          </span>
        </div>
      </header>
      
      <p className="text-muted-foreground flex-grow">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Badge key={tech} variant="small">
            {tech}
          </Badge>
        ))}
      </div>
    </BlockContent>
  );

  if (project.link !== '#') {
    const isExternal = project.link.startsWith('http');
    
    return (
      <a 
        href={project.link}
        className="block h-full"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <Block className="h-full flex flex-col hover:shadow-lg transition-shadow">
          {content}
        </Block>
      </a>
    );
  }

  return (
    <Block className="h-full flex flex-col">
      {content}
    </Block>
  );
}