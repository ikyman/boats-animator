import { Group, Stack } from "@mantine/core";
import { useContext, useState } from "react";

import { PageRoute } from "../../../../common/PageRoute";
import Content from "../../common/Content/Content";
import ContentBlock from "../../common/ContentBlock/ContentBlock";
import IconName from "../../common/Icon/IconName";
import Page from "../../common/Page/Page";
import PageBody from "../../common/PageBody/PageBody";
import Sidebar from "../../common/Sidebar/Sidebar";
import SidebarBlock from "../../common/SidebarBlock/SidebarBlock";
import { SemanticColor } from "../../ui/Theme/SemanticColor";
import { UiButton } from "../../ui/UiButton/UiButton";
import NewsFeed from "../NewsFeed/NewsFeed";

import { FileManagerContext } from "../../../context/FileManagerContext/FileManagerContext";
import { useNavigate } from "react-router-dom";
import { ProjectFilesContext } from "../../../context/ProjectFilesContext.tsx/ProjectFilesContext";


export const StartupPage = (): JSX.Element => {
  const navigate = useNavigate();
  const {loadProjectFromDisk}  = useContext(ProjectFilesContext)

  const fileManager = useContext(FileManagerContext);

  let boatsinfoFileHandler : FileSystemFileHandle | undefined = undefined;

  const [generalError, setGeneralError] = useState<string | undefined>(undefined);

  const onChangeBoatsInfoFile = async () => {
    boatsinfoFileHandler = await fileManager?.openFileDialog("loadBoatsinfoFile");

    console.log(fileManager)
    console.log(boatsinfoFileHandler)
    console.log(loadProjectFromDisk)
    if (boatsinfoFileHandler == undefined){
      return;
    }

    const boatsinfoFile = await boatsinfoFileHandler.getFile()

    if (loadProjectFromDisk){
      loadProjectFromDisk(boatsinfoFile);
      navigate(PageRoute.ANIMATOR_CAPTURE_SOURCE);
    }

  }

  return (
    <Page>
      <PageBody>
        <Content>
          <ContentBlock title="Welcome to Boats Animator!">
            <Stack justify="stretch" flex={1}>
              <Group>
                <UiButton
                  icon={IconName.ADD}
                  onClick={PageRoute.STARTUP_NEW_PROJECT_MODAL}
                  semanticColor={SemanticColor.PRIMARY}
                >
                  New Project
                </UiButton>
                <UiButton 
                  icon={IconName.FOLDER}
                  onClick={onChangeBoatsInfoFile}
                >
                  Open Project
                </UiButton>
              </Group>
              <UiButton icon={IconName.SETTINGS} onClick={PageRoute.STARTUP_PREFERENCES_MODAL}>
                Preferences
              </UiButton>
            </Stack>
          </ContentBlock>
        </Content>

        <Sidebar>
          <SidebarBlock title="News">
            <NewsFeed />
          </SidebarBlock>
        </Sidebar>
      </PageBody>
    </Page>
  );
};
