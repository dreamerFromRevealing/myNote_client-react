import React from 'react';
import List from "@mui/material/List";
import ProjectItem from "./ProjectItem";

interface ProjectsProps {
  projects: any
}

const Projects = ({projects}: ProjectsProps) => {
  return (
    <List>
      {projects && projects.map((project: any, index: number) => <ProjectItem key={index + 'project'} project={project}/>)}
    </List>
  );
};

export default Projects;