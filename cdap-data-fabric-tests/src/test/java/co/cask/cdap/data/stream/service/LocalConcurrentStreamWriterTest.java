/*
 * Copyright © 2015-2018 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package co.cask.cdap.data.stream.service;

import co.cask.cdap.common.conf.CConfiguration;
import co.cask.cdap.common.namespace.NamespacedLocationFactory;
import co.cask.cdap.common.namespace.NoLookupNamespacedLocationFactory;
import org.apache.twill.filesystem.LocalLocationFactory;
import org.apache.twill.filesystem.LocationFactory;
import org.junit.BeforeClass;

import java.io.IOException;

/**
 *
 */
public class LocalConcurrentStreamWriterTest extends ConcurrentStreamWriterTestBase {

  private static NamespacedLocationFactory namespacedLocationFactory;

  @BeforeClass
  public static void init() throws IOException {
    LocationFactory locationFactory = new LocalLocationFactory(TMP_FOLDER.newFolder());
    namespacedLocationFactory = new NoLookupNamespacedLocationFactory(CConfiguration.create(), locationFactory);
  }

  @Override
  protected NamespacedLocationFactory getNamespacedLocationFactory() {
    return namespacedLocationFactory;
  }
}
